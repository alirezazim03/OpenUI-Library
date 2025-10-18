export default function AvatarGroupLabel() {
    return (
        <div className="flex flex-wrap items-center justify-center p-1 rounded-full bg-gray-900 border border-gray-700 text-sm w-[300px] mx-auto">
            <div className="flex items-center">
                <img
                    className="w-[30px] rounded-full border-2 border-gray-900"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
                    alt="userImage1"
                />
                <img
                    className="w-[30px] rounded-full border-2 border-gray-900 -translate-x-2"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
                    alt="userImage2"
                />
                <img
                    className="w-[30px] rounded-full border-2 border-gray-900 -translate-x-4"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
                    alt="userImage3"
                />
            </div>
            <p className="-translate-x-2 text-gray-300">Trusted by 10,000+ people</p>
        </div>
    );
}
