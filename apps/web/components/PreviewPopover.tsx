import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import dynamic from "next/dynamic"
import type { ComponentMetadata } from "../types"

const DynamicReactPreview = dynamic(() => import("./ReactPreview"), {
	ssr: false,
	loading: () => (
		<div className="w-72 h-44 flex items-center justify-center text-gray-500 text-sm">
			Loading preview...
		</div>
	),
}) as any

interface PreviewPopoverProps {
	component: ComponentMetadata
	getFiles?: () => Promise<Record<string, string> | null>
	children?: ReactNode
}

export default function PreviewPopover({ component, getFiles, children }: PreviewPopoverProps) {
	const [open, setOpen] = useState(false)
	const [isTouch, setIsTouch] = useState(false)
	const [files, setFiles] = useState<Record<string, string> | null>(null)
	const [loaded, setLoaded] = useState(false)
	const [imageError, setImageError] = useState(false)
	const triggerRef = useRef<HTMLDivElement | null>(null)
	const popoverRef = useRef<HTMLDivElement | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const contentRef = useRef<HTMLDivElement | null>(null)
	const [scale, setScale] = useState(1)
	const id = useId()

	// Small intent delays to avoid accidental opens/closes
	const openTimer = useRef<number | null>(null)
	const closeTimer = useRef<number | null>(null)

	const scheduleOpen = () => {
		if (closeTimer.current) {
			window.clearTimeout(closeTimer.current)
			closeTimer.current = null
		}
		if (!openTimer.current) {
			openTimer.current = window.setTimeout(() => {
				setOpen(true)
				openTimer.current = null
			}, 120)
		}
	}

	const scheduleClose = () => {
		if (openTimer.current) {
			window.clearTimeout(openTimer.current)
			openTimer.current = null
		}
		if (!closeTimer.current) {
			closeTimer.current = window.setTimeout(() => {
				setOpen(false)
				closeTimer.current = null
			}, 120)
		}
	}

	useEffect(() => {
		setIsTouch(typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches)
	}, [])

	useEffect(() => {
		if (!open || loaded) return
		let cancelled = false
		const load = async () => {
			try {
				if (getFiles) {
					const f = await getFiles()
					if (!cancelled) {
						setFiles(f || null)
						setLoaded(true)
					}
				} else {
					setLoaded(true)
				}
			} catch {
				setLoaded(true)
			}
		}
		load()
		return () => {
			cancelled = true
		}
	}, [open, loaded, getFiles])

	useEffect(() => {
		function onDocKey(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false)
		}
		function onDocClick(e: MouseEvent) {
			if (!open) return
			const t = e.target as Node
			if (
				popoverRef.current && !popoverRef.current.contains(t) &&
				triggerRef.current && !triggerRef.current.contains(t)
			) {
				setOpen(false)
			}
		}
		document.addEventListener("keydown", onDocKey)
		document.addEventListener("mousedown", onDocClick)
		return () => {
			document.removeEventListener("keydown", onDocKey)
			document.removeEventListener("mousedown", onDocClick)
		}
	}, [open])

	// Auto-scale preview content to fit the fixed preview surface
	useEffect(() => {
		if (!open) return
		const container = containerRef.current
		const content = contentRef.current
		if (!container || !content) return

		let frameId: number | null = null
		const computeScale = () => {
			const contentWidth = Math.max(content.scrollWidth, content.offsetWidth)
			const contentHeight = Math.max(content.scrollHeight, content.offsetHeight)
			const containerWidth = container.clientWidth
			const containerHeight = container.clientHeight
			if (contentWidth === 0 || contentHeight === 0 || containerWidth === 0 || containerHeight === 0) {
				setScale(1)
				return
			}
			const nextScale = Math.min(containerWidth / contentWidth, containerHeight / contentHeight, 1)
			setScale(nextScale)
		}

		const ro = new ResizeObserver(() => {
			if (frameId) cancelAnimationFrame(frameId)
			frameId = requestAnimationFrame(computeScale)
		})
		ro.observe(container)
		ro.observe(content)

		const onWin = () => computeScale()
		window.addEventListener("resize", onWin)
		frameId = requestAnimationFrame(computeScale)

		return () => {
			ro.disconnect()
			window.removeEventListener("resize", onWin)
			if (frameId) cancelAnimationFrame(frameId)
		}
	}, [open])

	const openPreview = () => setOpen(true)
	const closePreview = () => setOpen(false)

	return (
		<div className="relative" ref={triggerRef}
			onMouseEnter={() => !isTouch && scheduleOpen()}
			onMouseLeave={() => !isTouch && scheduleClose()}
			onFocus={() => openPreview()}
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget)) closePreview()
			}}
			onClick={() => {
				if (isTouch) setOpen(o => !o)
			}}
			aria-haspopup="dialog"
			aria-expanded={open}
			aria-controls={`preview-${id}`}
		>
			{/* Trigger */}
			{children}

			{/* Popover */}
			{open && (
				<div
					id={`preview-${id}`}
					ref={popoverRef}
					role="dialog"
					aria-label={`${component.name} preview`}
					className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl focus:outline-none"
				>
					<div className="p-2">
						{/* Prefer code-based preview; fallback to image only if files unavailable */}
						{files ? (
							<div className="rounded-md overflow-hidden border bg-white">
						{/* Fixed preview surface with auto-scaling */}
						<div ref={containerRef} className="relative w-80 h-44 overflow-hidden bg-[repeating-conic-gradient(#f8f9fa_0%_25%,#e9ecef_25%_50%,#f8f9fa_50%_75%,#e9ecef_75%_100%)]" style={{backgroundSize:"20px 20px"}}>
							<div ref={contentRef} className="absolute top-0 left-0" style={{ transform: `scale(${scale})`, transformOrigin: "top left", pointerEvents: "none" }}>
							{component.framework === "react" ? (
								<div>
									<DynamicReactPreview
										componentFiles={files}
										componentName={component.name}
										compact
									/>
								</div>
							) : files["index.html"] ? (
									<iframe
										style={{ width: "640px", height: "480px", border: 0, pointerEvents: "none" }}
										srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8" />
										  <meta name="viewport" content="width=device-width, initial-scale=1" />
										  <style>html,body{margin:0;padding:0} a,button{pointer-events:none}</style>
										</head><body>${files["index.html"]}
										<script>document.addEventListener('DOMContentLoaded', function(){
										  const links=document.querySelectorAll('a');links.forEach(l=>{l.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();});});
										  const forms=document.querySelectorAll('form');forms.forEach(f=>{f.addEventListener('submit',e=>{e.preventDefault();e.stopPropagation();});});
										});</script>
										</body></html>`}
										title={`${component.name} preview`}
									/>
							) : (
								<div className="w-72 h-44 flex items-center justify-center text-gray-500 text-sm">
									Preview not available
								</div>
							)}
							</div>
						</div>
							</div>
						) : component.preview && !imageError ? (
							<img
								src={component.preview}
								alt={`${component.name} preview image`}
								className="w-80 h-44 object-cover rounded-md"
								loading="lazy"
								onError={() => setImageError(true)}
							/>
						) : (
							<div className="w-80 h-44 flex items-center justify-center text-gray-500 text-sm">
								Preparing preview...
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}


