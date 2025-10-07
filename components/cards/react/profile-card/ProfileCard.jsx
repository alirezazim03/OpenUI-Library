const ProfileCard = () => {

  const linkClass="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 bg-white/20 hover:bg-white/30 text-white"

  return (
    <div className="relative rounded-3xl p-7 transition-all duration-500 hover:scale-105 overflow-hidden group w-80
    bg-gradient-to-br from-yellow-700 via-amber-600 to-yellow-700
    text-white shadow-2xl my-10 mx-auto">

      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full ring-3 ring-yellow-600/20 p-1 transition-all duration-300 group-hover:scale-110">
            <img
              src=""
              alt="Abhijeet's avatar"
              className="w-full h-full rounded-full object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Name */}
        <h3 className="font-bold text-2xl mb-3 text-white">
          Abhijeet Singh
        </h3>

        {/* Bio */}
        <p className="leading-relaxed mb-6 text-blue-100">
          UI/UX Designer creating beautiful and user-friendly interfaces
        </p>

        <div className="flex justify-center gap-3 mb-6">
            <a
              href="https://twitter.com/user"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <span className="text-lg">𝕏</span>
            </a>
            <a
              href="https://github.com/user"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
            <span className="text-lg">⎔</span>
            </a>
            <a
              href="https://linkedin.com/in/user"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <span className="text-lg">in</span>
            </a>
        </div>

        <button
          onClick={() => alert("add onclick functionality for view portfolio button")}
          className="w-full py-3 rounded-xl font-semibold transition-all duration-300 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/20 cursor-pointer"
        >
          View Portfolio
        </button>

      </div>
    </div>
  )
}

export default ProfileCard