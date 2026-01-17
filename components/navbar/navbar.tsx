export default function Navbar() {
    return (
        <nav className="w-full py-3 px-6 text-white bg-navbar">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                {/* right side  */}
                <div>
                    <a href="/">Portfolio</a>
                </div>

                {/* left side  */}
                <div className="flex align-center justify-center gap-4">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/projects">Projects</a>
                </div>
            </div>

        </nav>
    )
}