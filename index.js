document.addEventListener('DOMContentLoaded', function() {
    const searchb = document.querySelector("#searchb");
    const apiKey = '6ba65f70f3d9fddd37a1e50799b6ea51'; 
    const mlist=document.querySelector('#mlist');
    const arr=JSON.parse(localStorage.getItem('alist'))
    mlist.addEventListener("click",()=>{
        
        window.location.href='4.html'
    })
    mlist.addEventListener("click",()=>{
        localStorage.setItem('alist',JSON.stringify(arr))
        window.location.href='4.html'
    })
     

    const findata = () => {
        const searchinp = document.querySelector("#msearch").value;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchinp}&include_adult=false&language=en-US&page=1`;
        
        return fetch(url)
            .then(response => response.json());
    };

    const searchdata = () => {
        findata()
            .then(res => {
                const searchinp = document.querySelector("#msearch").value;
                
                 
                
                const filteredResults = res.results.filter(result => 
                    result.original_title.toLowerCase().includes(searchinp.toLowerCase())
                );
                localStorage.setItem('filteredResults',JSON.stringify(filteredResults));
                const queryString=`?results=${encodeURIComponent(JSON.stringify(filteredResults))}`
                window.location.href='2.html' 
            })
            .catch(error => console.error('Error:', error));
    };

    searchb.addEventListener("click", searchdata);
   
});