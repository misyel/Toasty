let Login = {
    render: async() => {
        const nav = document.querySelector('nav');
        console.log(nav)
        nav.style.display = 'none'
        let view = `
        <div class='container'>
            <form class='inputForm' id='loginForm'>
                <h3>login</h3>
                <fieldset>
                    <label for='username'>username:</label>
                    <input name='username' type='text' required=true>
                </fieldset>
                <fieldset>
                    <label for='password'>password:</label>
                    <input name='password' type='password' required=true>
                </fieldset>
                <button type='submit' id='loginSubmit'> submit </button>
            </form>
        </div>
        `
        return view
    },
    after_render : async() => {
        const login = document.getElementById('loginSubmit');
        login.addEventListener('click', async(e) => {
            e.preventDefault();
            const form = document.getElementById('loginForm')
            const username = form.username;
            const password = form.password;

            console.log('user', username.value)

            const body = {}
            body.username = username.value;
            body.password = password.value;

            const response = await fetch('https://enigmatic-waters-10084.herokuapp.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            })
            const data = await response.json();
            console.log(data)
            const status = await response.status;
            console.log(status)
            if(status == 200){
                //store token
                const token = data.token;
                localStorage.setItem('token', token);
                //redirect to home
                window.location.href = "/#/home";
            }
            else if(status == 400){
                alert('invalid username or password')
            }
        })
    }
}

export {Login}