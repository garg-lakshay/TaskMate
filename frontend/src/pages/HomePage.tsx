import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={page}>
      {/* NAVBAR */}
      <nav style={navbar}>
        <h1 style={logo}>
          Task<span style={{ color: "#6C63FF" }}>Mate</span>
        </h1>

        <div style={navActions}>
          <Link to="/login" style={navBtnOutline}>Login</Link>
          <Link to="/signup" style={navBtnFilled}>Register</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={hero}>
        <h1 style={heroTitle}>
          Manage Your Tasks with <span style={{ color: "#6C63FF" }}>Clarity</span> & Ease
        </h1>

        <p style={subtitle}>
          Plan your day, track progress, update tasks, and stay ahead — all inside one
          beautifully designed productivity tool.
        </p>

        <Link to="/signup" style={ctaButton}>Start Organizing</Link>
      </header>

      {/* FEATURES */}
      <section style={featuresSection}>
        <div style={featureCard}>
          <div style={iconCircle}>📝</div>
          <h3 style={featureTitle}>Fast Task Creation</h3>
          <p style={featureText}>Add todos in seconds with a clean and simple interface.</p>
        </div>

        <div style={featureCard}>
          <div style={iconCircle}>📊</div>
          <h3 style={featureTitle}>Track Progress</h3>
          <p style={featureText}>Complete tasks and visualize productivity instantly.</p>
        </div>

        <div style={featureCard}>
          <div style={iconCircle}>🔄</div>
          <h3 style={featureTitle}>Easy Editing</h3>
          <p style={featureText}>Modify titles or descriptions without any hassle.</p>
        </div>

        <div style={featureCard}>
          <div style={iconCircle}>🔐</div>
          <h3 style={featureTitle}>Secure Login</h3>
          <p style={featureText}>Protected with JWT authentication for safety.</p>
        </div>
      </section>

      <footer style={footer}>
        © 2025 TaskMate — <b>Lakshay Garg</b>
      </footer>
    </div>
  );
}

/* ------------------ STYLES ------------------ */

const page = {
  fontFamily: "Inter, Arial, sans-serif",
  background: "#f7f7ff",
  minHeight: "100vh",
} as const;

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 50px",
  background: "white",
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  position: "sticky",
  top: 0,
  zIndex: 50,
} as const;

const logo = {
  fontSize: "30px",
  fontWeight: "800",
} as const;

const navActions = {
  display: "flex",
  gap: "12px",
} as const;

const navBtnOutline = {
  padding: "8px 18px",
  borderRadius: "8px",
  border: "2px solid #6C63FF",
  color: "#6C63FF",
  textDecoration: "none",
  fontWeight: 600,
} as const;

const navBtnFilled = {
  padding: "8px 18px",
  borderRadius: "8px",
  background: "#6C63FF",
  color: "#fff",
  textDecoration: "none",
  fontWeight: 600,
} as const;

const hero = {
  textAlign: "center",
  padding: "100px 20px 60px",
} as const;

const heroTitle = {
  fontSize: "50px",
  fontWeight: "800",
  maxWidth: "900px",
  margin: "0 auto 20px",
  color: "#1b1b1b",
} as const;

const subtitle = {
  fontSize: "18px",
  color: "#555",
  maxWidth: "650px",
  margin: "0 auto 30px",
  lineHeight: 1.6,
} as const;

const ctaButton = {
  padding: "14px 30px",
  background: "#6C63FF",
  borderRadius: "10px",
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: 600,
  boxShadow: "0 4px 12px rgba(108, 99, 255, 0.3)",
} as const;

const featuresSection = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "25px",
  maxWidth: "1200px",
  margin: "80px auto",
  padding: "0 20px",
} as const;

const featureCard = {
  padding: "30px",
  background: "white",
  borderRadius: "16px",
  textAlign: "center",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  transition: "transform 0.2s",
} as const;

const iconCircle = {
  fontSize: "35px",
  background: "#ecebff",
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  margin: "0 auto 15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as const;

const featureTitle = {
  fontSize: "20px",
  fontWeight: 700,
  marginBottom: "8px",
} as const;

const featureText = {
  fontSize: "15px",
  color: "#555",
  lineHeight: 1.4,
} as const;

const footer = {
  textAlign: "center",
  margin: "40px 0 20px",
  color: "#777",
} as const;
