// import Link from "next/link"
import Head from "next/head"
import Navbar from "../components/Navbar"
import { BiGitMerge, BiTrophy } from "react-icons/bi"
import { BsPeople } from "react-icons/bs"
import { GoGitCommit } from "react-icons/go"
import React, { useState } from "react"
const leaderBoardData = [
  { username: "alirezazim03", avatar: "https://github.com/alirezazim03.png", contributions: 4, role: "Contributor", github: "https://github.com/alirezazim03" },
  { username: "ankitpokhrel08", avatar: "https://github.com/ankitpokhrel08.png", contributions: 2, role: "Contributor", github: "https://github.com/ankitpokhrel08" },
  { username: "TejaswaniRai", avatar: "https://github.com/TejaswaniRai.png", contributions: 2, role: "Contributor", github: "https://github.com/TejaswaniRai" },
  { username: "jff2009", avatar: "https://github.com/jff2009.png", contributions: 2, role: "Contributor", github: "https://github.com/jff2009" },
  { username: "Ashish-Pandey62", avatar: "https://github.com/Ashish-Pandey62.png", contributions: 2, role: "Contributor", github: "https://github.com/Ashish-Pandey62" },
  { username: "beebadooo", avatar: "https://github.com/beebadooo.png", contributions: 1, role: "Contributor", github: "https://github.com/beebadooo" },
  { username: "kananmmehta", avatar: "https://github.com/kananmmehta.png", contributions: 1, role: "Contributor", github: "https://github.com/kananmmehta" },
  { username: "chatfly", avatar: "https://github.com/chatfly.png", contributions: 1, role: "Contributor", github: "https://github.com/chatfly" },
  { username: "zxnb01", avatar: "https://github.com/zxnb01.png", contributions: 1, role: "Contributor", github: "https://github.com/zxnb01" },
  { username: "Saikiran-Sugurthi", avatar: "https://github.com/Saikiran-Sugurthi.png", contributions: 1, role: "Contributor", github: "https://github.com/Saikiran-Sugurthi" },
  { username: "komalsathvik", avatar: "https://github.com/komalsathvik.png", contributions: 1, role: "Contributor", github: "https://github.com/komalsathvik" },
  { username: "abhijeet-singhh", avatar: "https://github.com/abhijeet-singhh.png", contributions: 1, role: "Contributor", github: "https://github.com/abhijeet-singhh" },
  { username: "suryssss", avatar: "https://github.com/suryssss.png", contributions: 1, role: "Contributor", github: "https://github.com/suryssss" },
  { username: "xMrAfonso", avatar: "https://github.com/xMrAfonso.png", contributions: 1, role: "Contributor", github: "https://github.com/xMrAfonso" },
  { username: "sudoyasir", avatar: "https://github.com/sudoyasir.png", contributions: 1, role: "Contributor", github: "https://github.com/sudoyasir" }
]

const topContributors = [
  { username: "ankitpokhrel08", avatar: "https://github.com/ankitpokhrel08.png", contributions: 2, role: "Contributor", github: "https://github.com/ankitpokhrel08" },
  { username: "alirezazim03", avatar: "https://github.com/alirezazim03.png", contributions: 4, role: "Contributor", github: "https://github.com/alirezazim03" },
  { username: "TejaswaniRai", avatar: "https://github.com/TejaswaniRai.png", contributions: 2, role: "Contributor", github: "https://github.com/TejaswaniRai" }
]

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className={`size-4 ${props.className || ""}`}
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 .198a8 8 0 0 0-2.53 15.6c.4.074.548-.174.548-.387 0-.19-.007-.693-.01-1.36-2.23.485-2.7-1.074-2.7-1.074-.364-.924-.89-1.17-.89-1.17-.727-.497.055-.487.055-.487.804.056 1.227.826 1.227.826.715 1.225 1.875.871 2.331.666.072-.518.28-.871.509-1.072-1.779-.202-3.651-.89-3.651-3.961 0-.875.312-1.59.824-2.151-.083-.203-.357-1.017.078-2.12 0 0 .671-.215 2.2.822a7.65 7.65 0 0 1 2.004-.27 7.65 7.65 0 0 1 2.003.27c1.53-1.037 2.2-.822 2.2-.822.436 1.103.162 1.917.08 2.12.513.561.823 1.276.823 2.15 0 3.078-1.875 3.756-3.659 3.956.287.246.543.733.543 1.479 0 1.067-.01 1.93-.01 2.193 0 .214.147.464.553.385A8.001 8.001 0 0 0 8 .198Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const LeaderBoard = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold">Top Contributors</div>
      <div className="relative flex gap-4 items-end mt-10 justify-center">
        {topContributors.map((contributor, index) => (
          <div className="relative flex flex-col items-center"
          key ={index}
          >
            <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${index === 0 ? "border-gray-300" : index === 1 ? "border-yellow-400" : "border-amber-800"}`}>
              <img
                src={contributor.avatar}
                alt={contributor.username}
                
                className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2">
              <BiTrophy size={20} className="text-gray-500" />
              <div className="text-gray-500"> {contributor.contributions} Contributions</div>
            </div>
            <div className={` ${index === 0 ? "w-36 h-24" : index === 1 ? " w-36 h-32" : "w-36 h-16"} bg-slate-300 mt-2 rounded-lg`}></div>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          window.location.href = "https://github.com/alirezazim03/OpenUI-Library"
        }
        className="flex items-center gap-2 px-4 py-2 mt-5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        <BiGitMerge size={20} />
        <span>Start Contributing</span>
      </button>
    </div>
  )
}
const OverallStats = () => {
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-200 rounded-lg">
          <BsPeople size={40} className="text-blue-600" />
        </div>
        <div className="text-start">
          <div className="text-2xl font-bold">
            6
          </div>
          <div className="text-gray-400 text-md">
            Active Contributors
          </div>
        </div>

      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center w-16 h-16 bg-violet-200 rounded-lg">
          <GoGitCommit size={40} className="text-violet-600" />
        </div>
        <div className="text-start">
          <div className="text-2xl font-bold">
            120
          </div>
          <div className="text-gray-400 text-md">
            Total Commits
          </div>
        </div>

      </div>
    </div>

  )
}

const AllContributors = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = leaderBoardData.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(leaderBoardData.length / itemsPerPage)

  return (
    <div className="w-full">
      <div className="text-3xl font-bold mt-10">All Contributors</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6 mt-10">
        {currentItems.map((contributor, index) => (
          <div
            key={index}
            className="
              border-2 border-violet-300 p-4 rounded-lg
              transform transition-all duration-300 ease-out
              hover:scale-105 hover:bg-purple-100
              cursor-pointer
            "
          >
            <div className="flex items-center gap-6">
              <div className="relative w-16 h-16">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-violet-500">
                  <img
                    src={contributor.avatar}
                    alt={contributor.username}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 right-0 bg-blue-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full translate-x-1 -translate-y-1">
                    {indexOfFirstItem + index + 1}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start">
                <div className="text-xl font-bold">{contributor.username}</div>
                <div className="flex items-center space-x-6">
                  <div className="text-gray-600 flex items-center gap-2">
                    <GoGitCommit size={20} className="text-purple-600" />
                    {contributor.contributions} contributions
                  </div>
                  <button
                    onClick={() => window.open(contributor.github, "_blank")}
                    className="flex items-center gap-2 px-2 bg-white border border-gray-300 rounded-md text-gray-800 hover:bg-gray-50 hover:border-gray-400 transition"
                  >
                    <GitHubIcon className="w-4 h-4 text-gray-800" />
                    <span className="font-small">Github</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="px-3 h-8 border border-gray-500 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
        <button
          className="px-3 h-8 border border-gray-500 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}
export default function Contributors() {
  return (
    <>
      <Head>
        <title>Contributors - Open UI Library</title>
        <meta
          name="description"
          content="Contributors to the Open UI Library project"
        />
        <link
          rel="icon"
          href="https://xbllreuvbgzawhgemndh.supabase.co/storage/v1/object/public/material/openUI.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col dark:bg-gray-900">
        <Navbar currentPage="contributors" />

        {/* Main Content */}
        <main className="flex-1 flex  justify-center">
          <div className="flex flex-col text-center mt-6">
            <div className="text-4xl font-bold">
              Our Amazing Contributors
            </div>
            <div className="text-gray-500 mt-2">
              Celebrating the people who make our page amazing
            </div>
            <div className="mt-10">
              <LeaderBoard />
            </div>
            <div className="mt-10 flex justify-center">
              <OverallStats />
            </div>
            <div className="mb-4">
              <AllContributors />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-auto dark:bg-gray-800 dark:border-gray-700">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 mb-4 md:mb-0 dark:text-gray-400">
                Open UI Library - MIT License
              </p>
              <div className="flex items-center space-x-6">
                <a
                  href="https://github.com/alirezazim03/OpenUI-Library"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Contributing
                </a>
                <a
                  href="https://github.com/alirezazim03/OpenUI-Library/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  License
                </a>
                <a
                  href="https://discord.gg/649Q4HG3XK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Discord
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
