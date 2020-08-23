let Signup = {
    render: async() => {
        let view = `
        <div class='container'>
            <form class='inputForm'>
                <h3>signup</h3>
                <fieldset>
                    <label for='firstName'>username:</label>
                    <input name='firstName' type='text' required=true>
                </fieldset>
                <fieldset>
                    <label for='lastName'>username:</label>
                    <input name='lastName' type='text' required=true>
                </fieldset>
                <fieldset>
                    <label for='username'>username:</label>
                    <input name='username' type='text' required=true>
                </fieldset>
                <fieldset>
                    <label for='password'>username:</label>
                    <input name='password' type='text' required=true>
                </fieldset>
                <fieldset>
                    <label for='confirmPassword'>username:</label>
                    <input name='confirmPassword' type='text' required=true>
                </fieldset>
                <button type='submit' id='signupSubmit'> submit </button>
            </form>
        </div>
        `
        return view
    },
    after_render : async() => {}
}

export {Signup}