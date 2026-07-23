const charCount = document.getElementById("charCount");
const clearBtn = document.getElementById("clearBtn");
const topic = document.getElementById("topic");
const difficulty = document.getElementById("difficulty");
const count = document.getElementById("count");

const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");
const loading = document.getElementById("loading");

const copyBtn = document.getElementById("copyBtn");
const regenerateBtn = document.getElementById("regenerateBtn");


async function generateQuiz() {
    if (!navigator.onLine) {
        alert("No internet connection.");
        return;
    }
    
    if (topic.value.trim() === "") {
        alert("Enter a topic.");
        return;
    }

    output.textContent = "";
    loading.style.display = "block";
    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";

    try {

        generateBtn.disabled = true;
        regenerateBtn.disabled = true;
        copyBtn.disabled = true;

        const response = await fetch("/generate-quiz", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topic: topic.value,
                difficulty: difficulty.value,
                num_questions: Number(count.value)
            })
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {

            const { done, value } = await reader.read();

            if (done) break;

            const chunkText = decoder.decode(value);

              output.innerHTML += chunkText
               .replace(/^Question (\d+):/gm, "<div class='question-card'><h3>Question $1</h3>")
               .replace(/^A\.\s(.*)$/gm, "<p>🅰️ $1</p>")
               .replace(/^B\.\s(.*)$/gm, "<p>🅱️ $1</p>")
               .replace(/^C\.\s(.*)$/gm, "<p>🅲 $1</p>")
               .replace(/^D\.\s(.*)$/gm, "<p>🅳 $1</p>")
               .replace(/^Correct Answer:\s(.*)$/gm, "<p class='answer'><strong>✅ Correct Answer:</strong> $1</p>")
               .replace(/^Explanation:$/gm, "<p class='explanation'><strong>💡 Explanation</strong></p>")
               .replace(/----------------------------------------/g, "</div>")
               .replace(/\n/g, "<br>");

        }

    } catch (err) {

    output.innerHTML = `
        <div style="padding:20px;color:#ffb4b4;">
            <h3>⚠️ Unable to generate quiz</h3>
            <p>Please check:</p>
            <ul>
                <li>Is the FastAPI server running?</li>
                <li>Is your internet connection working?</li>
                <li>Is your OpenRouter API key valid?</li>
            </ul>
        </div>
    `;

    console.error(err);

}
    generateBtn.disabled = false;
    generateBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Generate Quiz';

    loading.style.display = "none";

}    

    generateBtn.disabled = false;
    regenerateBtn.disabled = false;
    copyBtn.disabled = false;



generateBtn.addEventListener("click", generateQuiz);

regenerateBtn.addEventListener("click", generateQuiz);

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(output.textContent);

    copyBtn.textContent = "Copied!";

setTimeout(() => {
    copyBtn.textContent = "Copy";
}, 2000);

});

document.getElementById("downloadBtn").addEventListener("click", () => {

    if (output.innerHTML.trim() === "") {
        alert("Generate a quiz first!");
        return;
    }

    const pdfContent = document.createElement("div");
    pdfContent.style.padding = "20px";
    pdfContent.style.fontFamily = "Poppins, Arial, sans-serif";
    pdfContent.style.fontSize = "14px";
    pdfContent.style.color = "#000";
    pdfContent.innerHTML = output.innerHTML;

    html2pdf()
        .set({
            margin: 10,
            filename: "QuizGenAI_Quiz.pdf",
            html2canvas: {
                scale: 2
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            }
        })
        .from(pdfContent)
        .save();

});

topic.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        generateQuiz();
    }
});

clearBtn.addEventListener("click", () => {

    output.innerHTML = "";

    topic.value = "";

    topic.focus();

});

topic.addEventListener("input", () => {

    if (topic.value.length > 100) {
        topic.value = topic.value.substring(0, 100);
    }

    charCount.textContent = `${topic.value.length} / 100`;

});