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
        store.innerHTML = "";
        items.forEach(item => {
            data = item.data();
            var div1 = document.createElement("div");
            div1.style.display = "grid";
            div1.style.gridTemplateColumns = "auto auto auto auto";
            var name = document.createElement("h4");
            name.innerHTML=data.name;
            var count = document.createElement("p");
            count.innerHTML=data.count;
            var buy = document.createElement("button");
            buy.textContent = "buy";
            buy.id = data.name;
            buy.value = -1;
            buy.addEventListener('click', updateCount, false);
            var retrn = document.createElement("button");
            retrn.textContent = "return";
            retrn.id = data.name;
            retrn.value = 1;
            retrn.addEventListener('click', updateCount, false);
            store.appendChild(div1)
            div1.appendChild(name)
            div1.appendChild(count)
            div1.appendChild(buy)
            div1.appendChild(retrn)
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

function updateCount(e) {
    console.log(e.target.id);
    item_name = e.target.id;
    value = e.target.value;
    const db = firebase.firestore();
    const item = db.collection('Store').doc(item_name);
    item.update({count: firebase.firestore.FieldValue.increment(value)});

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

function uploadFile(files){
    const myStorage = firebase.storage().ref()
    const file = files.item(0)
    const img_name = file.name
    console.log(img_name)
    const imageRef = myStorage.child("images/" + img_name)
    imageRef.put(file)
    imageRef.getDownloadURL()
    .then(url => {
        console.log(url)
        document.querySelector('#impUpload').setAttribute('src', url)
    })
}