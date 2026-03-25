# 🚀 GitSentinel

**GitSentinel** is a smart tool that analyzes GitHub repositories to detect risky or suspicious activity in commits, contributors, and code patterns.

It helps developers and teams identify potential security issues early — before they become serious problems.

---

## 🔍 What It Does

* Scans a GitHub repository using basic inputs (owner, repo, branch)
* Analyzes recent commits and contributor activity
* Detects suspicious patterns like:

  * Secrets in code
  * Unusual commit behavior
  * Risky file changes
* Generates a simple and clear **risk score**
* Displays results in an interactive dashboard

---

## 🧠 Key Features

* 📊 **Commit Analysis** – Scan and evaluate recent commits
* ⚠️ **Suspicious Detection** – Identify high-risk changes
* 👥 **Contributor Insights** – Track contributor behavior
* 📈 **Risk Scoring** – Simple score to understand project safety
* 🖥️ **Modern Dashboard** – Clean UI with visual insights

---

## 🛠️ Tech Stack

* **Frontend:** Next.js, TypeScript, Tailwind CSS
* **State Management:** Zustand
* **Backend:** Node.js (API-based scanning system)

---

## 📦 Project Structure

```bash
src/
  app/            # Pages (Next.js routing)
  components/     # UI components
  services/       # API calls
  store/          # Global state (Zustand)
  utils/          # Helper functions
```

## 🔗 How It Works

1. User enters repository details
2. Frontend sends request to backend API
3. Backend scans commits and analyzes patterns
4. Results are returned and displayed on dashboard

---

## 📊 Example Output

* Total commits scanned
* Suspicious commits detected
* Risk score (Low / Medium / High)
* Detailed commit-level insights

---

## 🚀 Future Improvements

* Real-time monitoring of repositories
* More advanced detection models
* Team collaboration features
* Integration with CI/CD pipelines

---
