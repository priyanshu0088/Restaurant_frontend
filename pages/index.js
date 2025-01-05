import Link from "next/link";
// import "../styles/global.css";

export default function Home() {
  return (
    <>
      {/* Background Circles */}
      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>
      <div className="background-circle circle3"></div>
      <div className="background-circle circle4"></div>

      {/* Main Content */}
      <div className="container">
        <div className="card">
          <h1 className="title">Welcome to Our Restaurant</h1>
          <p className="subtitle">Experience a delightful dining journey!</p>
          <div className="button-group">
            <Link href="/booking">
              <button className="button book-button">Book a Table</button>
            </Link>
            <Link href="/calendar">
              <button className="button calendar-button">View Calendar</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
