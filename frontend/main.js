console.log('hey')

const content = document.getElementById('content');
const nav = document.getElementById('nav');

nav.addEventListener('click', (e) => {
    if(e.target.id == 'bulletin'){
        console.log('clicked');
        getBulletin();
    }
    else if(e.target.id == 'book-bag'){
        getBookBag();
    }
})

//bulletin board
async function getBulletin() {
    console.log('getting bulletin')
    const response = await fetch('https://enigmatic-waters-10084.herokuapp.com/bulletin', {
        method: 'GET',
        mode: 'cors'
    })

    const bulletins = await response.json();

    bulletins.bulletins.forEach((bulletin) => {

        //do dom stuff here
        console.log(bulletin);
    });
}

//bookbag
async function getBookBag() {
    console.log('getting bookbag')
    const response = await fetch('https://enigmatic-waters-10084.herokuapp.com/bookBag', {
        method: 'GET',
        mode: 'cors'
    })

    const summaries = await response.json();

    summaries.summaries.forEach((summary) => {

        //do dom stuff here
        console.log(summary);
    });
}

