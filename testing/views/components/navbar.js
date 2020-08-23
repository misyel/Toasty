let Navbar = {
    render: async () => {
        let view = `
        <nav class="navbar">
            <div>
                <img class='home-logo' src='../images/toasty-logo.png'>
            </div>
            <a class="navbar-item" href="/#/bulletin">
                <img class='nav-logo' src='../images/bulletin-board.png'>
                <br>
                
            </a>
            <a class="navbar-item" href="/#/bookbag">
                <img class='nav-logo' src='../images/backpack.png'>
                <br>
                
            </a>
            <a class="navbar-item" href="/#/">
                <img class='nav-logo' src='../images/star.png'>
                <br>      
            </a>
            <a class="navbar-item" href="/#/">
                <img class='nav-logo' src='../images/chat.png'>
                <br>      
            </a>
            <a class="navbar-item" href="/#/">
            <img class='nav-logo' src='../images/show-and-tell.png'>
            <br>      
        </a>
            <a class="navbar-item" href="/#/signup">
                signup
            </a>
        </nav>
        `
        return view
    },

    after_render: async () => {}
}

export {Navbar};