
<h1 align="center">🚀 Next.js Full-Stack App</h1>

<p align="center">
  <strong>A full-stack Next.js application with TailwindCSS, MongoDB, and Docker support.</strong>
</p>

---

<h2>📌 Features</h2>
<ul>
  <li>🔥 Built with <strong>Next.js 15</strong></li>
  <li>🎨 Styled using <strong>TailwindCSS</strong></li>
  <li>🛠️ Backend powered by <strong>MongoDB & Mongoose</strong></li>
  <li>🔐 Secure authentication with <strong>JWT & bcryptjs</strong></li>
  <li>🐳 Ready for <strong>Docker deployment</strong></li>
</ul>

---

<h2>🚀 Getting Started</h2>

<h3>1️⃣ Clone the Repository</h3>
<pre><code>git clone https://github.com/pixelavii/panScience.git</code></pre>

<h3>2️⃣ Install Dependencies</h3>
<pre><code>npm install</code></pre>

<h3>3️⃣ Run Development Server</h3>
<pre><code>npm run dev</code></pre>
<p>Now open <a href="http://localhost:3000">http://localhost:3000</a> in your browser.</p>

---

<h2>🐳 Docker Setup</h2>

<h3>1️⃣ Build the Docker Image</h3>
<pre><code>docker build -t my-nextjs-app .</code></pre>

<h3>2️⃣ Run the Docker Container</h3>
<pre><code>docker run -p 3000:3000 my-nextjs-app</code></pre>

<h3>3️⃣ Push to Docker Hub</h3>
<pre><code>
docker login
docker tag my-nextjs-app yourusername/nextjs-app:latest
docker push yourusername/nextjs-app:latest</code></pre>

---

<h2>📂 Project Structure</h2>
<pre>
📦 your-nextjs-app
├── 📁 pages         # Next.js pages
├── 📁 components    # Reusable UI components
├── 📁 styles       # Global styles (TailwindCSS)
├── 📁 api         # Backend APIs (MongoDB)
├── 📄 package.json # Project dependencies
├── 📄 Dockerfile   # Docker setup
└── 📄 README.md    # Project documentation
</pre>

---

<h2>📜 License</h2>
<p>MIT License. See <a href="LICENSE">LICENSE</a> for details.</p>

<h2>🙌 Contributing</h2>
<p>Pull requests are welcome! Feel free to open an issue or submit improvements.</p>
>>>>>>> e239157dfb918f545902ec13c8a1b4b4907f20bd
