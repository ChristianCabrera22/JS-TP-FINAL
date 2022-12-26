//creamos el abcdario con javascript
let abc = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
for (let i=0; i<abc.length; i++) {
    const a = document.createElement('a');
    a.setAttribute("href", "#letra");
    a.setAttribute("onclick", `pushLetra("${abc.charAt(i)}")`);
    a.textContent = "  " +abc.charAt(i);
    document.querySelector(".abcdario").appendChild(a);
}
