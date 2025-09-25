export interface ComponentMetadata {
  name: string
  version: string
  author?: string
  category: string
  framework: string
  path: string
  tags?: string[]
  license?: string
  demoUrl?: string
  props?: ComponentProp[]
}

export interface ComponentProp {
  name: string
  type: string
  description: string
  required?: boolean
  defaultValue?: any
}

export interface ComponentWithFiles extends ComponentMetadata {
  files: Record<string, string>
}

export interface ComponentPageProps {
  component?: ComponentWithFiles
  error?: string
}

export interface ReactPreviewProps {
  componentFiles: Record<string, string>
  componentName: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
}

export interface ComponentsApiResponse {
  components: ComponentMetadata[]
}

export interface ComponentApiResponse {
  component: ComponentWithFiles
}
