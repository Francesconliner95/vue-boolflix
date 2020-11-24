var app = new Vue({
    el: '#root',
    data: {
        search_text: '',
        search_array: [],
        },
    methods: {
        search: function(){
            console.log('entrato');
            axios.get('https://api.themoviedb.org/3/search/movie',{
                params:{
                    api_key: '4a1844d0c1312fb56c1a5f50c104b224',
                    query: app.search_text
                }
            }
        ).then(function(risposta) {
            console.log(risposta);
            app.search_array=risposta.data.results;
            console.log(app.search_array);
            });
        },
    },

    mounted: function(){




    },

})
