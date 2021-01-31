const TypeWriter = function (txtElement, words, waitTime = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.waitTime = parseInt(waitTime, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function () {

    // Current index of word
    const current = this.wordIndex % this.words.length;

    // Get full text of current word
    const fulltxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
        // Remove char
        this.txt = fulltxt.substring(0, this.txt.length - 1);
    }
    else {
        // Add char
        this.txt = fulltxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    // Initial Type Speed
    let typeSpeed = 300;
    if(this.isDeleting){
        typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fulltxt){
        // Make pause at end
        typeSpeed = this.waitTime;
        // Set delete to true
        this.isDeleting = true;
    } else if( this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 300;
    }


    setTimeout(() => this.type(), 300);
}

// Init on Dom Load 
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-rotate');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const waitTime = txtElement.getAttribute('data-wait');

    // Init Typewriter
    new TypeWriter(txtElement, words, waitTime);
}