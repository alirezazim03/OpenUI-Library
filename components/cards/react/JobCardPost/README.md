# Job Posting Card

A clean, responsive **Job Posting Card** component built using **HTML, Tailwind CSS, and JavaScript**.  
It displays key job details such as title, company, salary, tags, and post date in a visually appealing card layout.  
The component can dynamically render job listings by fetching data from a `component.json` file, with fallback defaults for empty or missing data.

---

**Author:** [@kananmmehta](https://github.com/kananmmehta)

---

## Features
- 🎨 **Modern, minimal UI** with Tailwind CSS styling  
- ⚡ **Dynamic rendering** of multiple job cards from JSON data  
- 🧩 **Fallback default job data** if the JSON file is empty or unavailable  
- 🪶 **Hover animations** with smooth transitions and shadows  
- 💻 **Easily embeddable** in any HTML or React-based project  

---

## Usage

1. **Include Tailwind CSS** in your HTML file:

   ```html
   <script src="https://cdn.tailwindcss.com"></script>
   ```
2. Add your job container and script in the HTML:
```
<body>
  <div id="jobContainer" class="flex flex-col gap-6 items-center p-8"></div>
  <script src="script.js"></script>
</body>
```

3. Create a component.json file in the same directory:

```
[
  {
    "logo": "slack-logo.png",
    "company": "Slack",
    "title": "Senior UI Designer",
    "salary": "$80k – $100k / year",
    "tags": ["Project-Based", "Remote"],
    "postedDate": "2 DAYS AGO"
  },
  {
    "logo": "slack-logo.png",
    "company": "Slack",
    "title": "Frontend Developer",
    "salary": "$70k – $90k / year",
    "tags": ["Full-Time", "Remote"],
    "postedDate": "5 DAYS AGO"
  }
]
```

4. Add the script to dynamically load the data:

```
<script>
const jobContainer = document.getElementById('jobContainer');

const defaultJobs = [
  {
    "logo": "slack-logo.png",
    "company": "Slack",
    "title": "Senior UI Designer",
    "salary": "$80k – $100k / year",
    "tags": ["Project-Based", "Remote"],
    "postedDate": "2 DAYS AGO"
  }
];

async function loadJobs() {
  let jobs = [];
  try {
    const response = await fetch('component.json');
    if (!response.ok) throw new Error('Failed to fetch JSON');
    jobs = await response.json();
    if (!Array.isArray(jobs) || jobs.length === 0) jobs = defaultJobs;
  } catch {
    jobs = defaultJobs;
  }

  jobContainer.innerHTML = '';
  jobs.forEach(job => {
    const card = document.createElement('div');
    card.className = "bg-white rounded-2xl shadow-[0_6px_20px_rgba(205,78,78,0.707)] border-2 border-[#e46666] hover:-translate-y-1 hover:shadow-xl hover:border-[#d28d78] transition p-0";
    card.innerHTML = `
      <div class="flex flex-col gap-3 mb-4 p-6 pb-0">
        <div class="flex items-center gap-4 mb-3">
          <img src="${job.logo}" alt="Company Logo" class="w-12 h-12 rounded-lg">
          <div><p class="text-sm text-gray-600 font-semibold">${job.company}</p></div>
        </div>
        <h2 class="text-lg font-semibold text-gray-900">${job.title}</h2>
        <p class="text-sm text-gray-700 mb-4">${job.salary}</p>
        <div class="flex gap-2 mb-3">
          ${job.tags.map(tag => `<span class="px-3 py-1 rounded-xl text-xs font-semibold bg-[#a4baecbf] text-[#0027ad]">${tag}</span>`).join('')}
        </div>
      </div>
      <div class="flex justify-center py-3 px-4 rounded-b-2xl bg-[#df807136] text-[#a8414191] text-base font-medium">
        POSTED ${job.postedDate}
      </div>`;
    jobContainer.appendChild(card);
  });
}

loadJobs();
</script>
```

---

##Props 

Although this version uses HTML + JSON, you can easily adapt it for React.
Here are the equivalent props for a React setup:

| Prop Name    | Type     | Description                     | Example Value             |
| ------------ | -------- | ------------------------------- | ------------------------- |
| `logo`       | string   | Path or URL of the company logo | `"slack-logo.png"`        |
| `company`    | string   | Company name                    | `"Slack"`                 |
| `title`      | string   | Job title                       | `"Senior UI Designer"`    |
| `salary`     | string   | Salary range or details         | `"$80k – $100k / year"`   |
| `tags`       | string[] | Array of job tags               | `["Remote", "Full-Time"]` |
| `postedDate` | string   | When the job was posted         | `"2 DAYS AGO"`            |

Customization
🖌 Colors & Borders:
Update the Tailwind utility classes (like border-[#e46666], bg-[#df807136], etc.) for different themes.

🧠 Animation & Hover Effects:
Modify or extend the Tailwind classes under hover: or transition to adjust interaction feel.

🧩 Data Source:
Replace component.json with an API endpoint to fetch real-time job data dynamically.

💡 Default Job Logic:
Update the defaultJobs array in the script to match your preferred fallback content.

✨ Result:
A flexible, modern Job Posting Card that can be integrated into any campus recruitment portal, portfolio, or UI library easily.