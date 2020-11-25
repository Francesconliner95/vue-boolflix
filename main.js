var app = new Vue({
    el: '#root',
    data: {
        search_text: '',
        word: '',
        research_in_progress: false,
        search_array: [],
        flags_array:['en', 'it', 'jp', 'es', 'fr'],
        },
    methods: {
        search: function(){
        if(app.search_text.trim()!=''){
            app.research_in_progress=true;
            console.log('entrato');
            app.search_array=[];
            axios.get('https://api.themoviedb.org/3/search/movie',{
                params:{
                    api_key: '4a1844d0c1312fb56c1a5f50c104b224',
                    query: app.search_text
                }
            }
        ).then(function(risposta) {
            app.search_array.push(...risposta.data.results);
            });
            axios.get('https://api.themoviedb.org/3/search/tv',{
                params:{
                    api_key: '4a1844d0c1312fb56c1a5f50c104b224',
                    query: app.search_text
                }
            }
        ).then(function(risposta2) {
            app.search_array.push(...risposta2.data.results);
            app.research_in_progress=false;
            });
        console.log(app.search_array);
        app.word=app.search_text
        app.search_text= '';
        }
        },
    },

    mounted: function(){
        // console.log(this.search_array);
    },

})
