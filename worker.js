const WORKER_URL = "https://your-worker-name.workers.dev"; // আপনার Worker এর URL এখানে দিন

// পোস্ট লোড করার ফাংশন
async function loadPosts() {
    const res = await fetch(`${WORKER_URL}/api/posts`);
    const posts = await res.json();
    const container = document.getElementById('blog-container');
    container.innerHTML = posts.map(post => `
        <div class="admin-card mb-4">
            <h3 class="text-xl font-bold text-blue-500">${post.title}</h3>
            <p class="text-gray-400 mt-2">${post.content}</p>
            <span class="text-[10px] text-gray-600 mono">${post.created_at}</span>
        </div>
    `).join('');
}

// নতুন পোস্ট পাবলিশ করার ফাংশন
async function publishPost() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    
    await fetch(`${WORKER_URL}/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' }
    });
    
    alert("Post Live on Archive!");
    loadPosts();
    navigate('blog');
}

// যখনই ব্লগে ক্লিক করবেন, পোস্ট লোড হবে
function navigate(id) {
    if(id === 'blog') loadPosts();
    // ... আপনার আগের নেভিগেশন কোড ...
}
