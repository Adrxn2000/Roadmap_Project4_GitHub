document.getElementById("Profile").addEventListener("click", fetchProfile);
async function fetchProfile() {
    const username = document.getElementById("username").value;
    const profile = document.getElementById("profile");
    const error = document.getElementById("Error");

    profile.innerHTML = "";
    error.innerHTML = "";

    if (!username) {
        error.innerHTML = "Username is required";
        return;
    }

    try{
        const response = await fetch(`https://api.github.com/users/${username}`);

        if(response.status === 404){
            error.innerHTML = "No profile found";
            return;
        }

        const data = await response.json();

        profile.innerHTML = `
           <img src="${data.avatar_url}" alt="Avatar" width="100">
                    <h2>${data.name || 'No Name Provided'}</h2>
                    <p><strong>Username:</strong> ${data.login}</p>
                    <p><strong>Bio:</strong> ${data.bio || 'No Bio Available'}</p>
                    <p><strong>Public Repos:</strong> ${data.public_repos}</p>
                    <p><strong>Followers:</strong> ${data.followers}</p>
                    <p><strong>Following:</strong> ${data.following}</p>
                    <a href="${data.html_url}" target="_blank">View Profile</a>
                `;

    }catch(error){
        error.innerHTML = "There was an error";
    }
    
}