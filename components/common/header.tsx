import Link from "next/link"

const Header = () => {
  return (
    <nav className="container">
      <div>
        <Link href="/">
          summary.ai
        </Link>
      </div>
    </nav>
  )
}

export default Header