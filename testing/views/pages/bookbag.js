
let getSummaries = async() => {
    console.log('getting bookbag')
    const response = await fetch('https://enigmatic-waters-10084.herokuapp.com/bookBag', {
        method: 'GET',
        mode: 'cors'
    })

    const summaries = await response.json();

    return summaries;
}


let BookBag = {
    render : async() => {
        const summaries = await getSummaries()
        let view = `
        <div class='modal'>
            <form id="bookForm" class='modal-content'>
                <ul>
                    <li><label for="bookTitle">book title</label>
                         <input id="bookTitle" type="text" name="bookTitle"></li>
                    <li><label for="summary">summary</label>
                        <input id="summary" type="text" name="summary"></li>
                    <li><button type='submit' id="bookSubmit">submit</button><button id="bookCancel">cancel</button></li>
                </ul>
            </form>
        </div>

        <div class='banner-container'>
            <img class='banner' src='../images/book-bag-banner-longer.jpg'>
        </div>
        <div class='center-button'>
            <button class='modal-button' id='addBook'> add summary </button>
        </div>
        <ul id='bookbag'>
            ${summaries.summaries.map(summary => 
                /*html*/`
                <li class='bulletin-list'>
                    <h2>${summary.bookTitle}</h2>
                    <p> ${summary.summary} </p>
                    <p> by ${summary.student.firstName}</p>
                </li>`
                ).join('\n ')
            }
        </ul>
`
        return view
    },
    after_render : async() => {

        //form handling
        const modal = document.getElementById('addBook');
        const cancel = document.getElementById('bookCancel');
        var modals = document.querySelector('.modal');
            

        modal.addEventListener('click', () => {
            modals.style.display = 'block';
        })

        cancel.addEventListener('click', () => {
            modals.style.display = 'none';
        })


        //api stuff
        const book = document.getElementById('bookSubmit');
        book.addEventListener('click', async(e) => {
            e.preventDefault();
            const form = document.getElementById('bookForm')
            const bookTitle = form.bookTitle;
            const summary = form.summary;

            const body = {}
            body.bookTitle = bookTitle.value;
            body.summary = summary.value;
            body.student = 'test';

            console.log(body)

            const response = await fetch('https://enigmatic-waters-10084.herokuapp.com/bookBag/new-summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            })
            const data = await response.json();
            console.log(data);
            const status = await response.status;
            if(status == 400){
                console.log('error')
            }

            location.reload();
        })
    }
}

export {BookBag}