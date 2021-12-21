document.addEventListener("DOMContentLoaded", event =>{
    const app = firebase.app();
    console.log(app);

    const store = document.getElementById("store");

    const db = firebase.firestore();

    const myPost = db.collection('posts').doc('firstpost');

    myPost.onSnapshot(doc => {
        const data = doc.data();
        document.getElementById("title").innerHTML = data.title;
        document.getElementById("change-count").innerHTML = data.count;
    })

    const myStore = db.collection('Store');
    myStore.onSnapshot(items => {
        items.forEach(item => {
            data = item.data();
            var h3 = document.createElement("h3");
            h3.innerHTML=data.name;
            store.appendChild(h3)
            console.log(data)
        })

    })
});

function updatePost(e) {
    const db = firebase.firestore();
    const increment = firebase.firestore.FieldValue.increment(1);
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update({ title: e.target.value })
    myPost.update({count: increment})
}

function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result => {
        const user = result.user;
        document.write('Hello ' , user.displayName);
        console.log(user);
    })
    .catch(console.log);
}