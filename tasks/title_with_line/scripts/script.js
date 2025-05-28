const element = document.getElementById('box')
const btn = document.getElementById('button')

btn.addEventListener('click', function() {
    console.log(element)
    element.style.backgroundColor = 'green'
})