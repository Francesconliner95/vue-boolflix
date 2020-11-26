var app = new Vue({
    el: '#root',
    data: {
        search_text: '',
        word: '',
        research_in_progress: false,
        search_array: [],
        flags_array:['en', 'it', 'jp', 'es', 'fr'],
        array: [],
        main_array: [],
        categories: 'All Categories',
        },
    methods: {
        search_enter(){
            this.search();
        },

        auto_select_refresh(){
            if (this.search_text=='') {
                this.search_text = this.word;
            }
            else{
                this.search_text = '';
            }
            this.search();
        },

        search(){
            switch(this.categories) {
              case 'All Categories':
                console.log('tutti');
                this.searchMovies_TvShow();
                break;
              case 'TVshow':
                this.searchTvShow();
                console.log('serie');
                break;
              case 'Movie':
                console.log('film');
                this.searchMovies();
                break;
              default:
                console.log('tutti');
                this.searchMovies_TvShow();
            }
        },

        searchMovies_TvShow(){
            if(app.search_text.trim()!=''){
                app.research_in_progress=true;
                app.search_array=[];
                this.getMovies();
                this.getSeries();
                console.log(app.search_array);
                app.word=app.search_text;
                app.search_text= '';
            }
        },

        searchMovies(){
            if(app.search_text.trim()!=''){
                app.research_in_progress=true;
                app.search_array=[];
                this.getMovies();
                console.log(app.search_array);
                app.word=app.search_text;
                app.search_text= '';
            }
        },

        searchTvShow(){
            if(app.search_text.trim()!=''){
                app.research_in_progress=true;
                app.search_array=[];
                this.getSeries();
                console.log(app.search_array);
                app.word=app.search_text;
                app.search_text= '';
            }
        },

        getMovies(){
            axios.get('https://api.themoviedb.org/3/search/movie',{
                params:{
                    api_key: '4a1844d0c1312fb56c1a5f50c104b224',
                    query: app.search_text,
                }
            }
        ).then(function(risposta) {
            app.search_array.push(...risposta.data.results);
            app.research_in_progress=false;
            });
        },

        getSeries(){
            axios.get('https://api.themoviedb.org/3/search/tv',{
                   params:{
                       api_key: '4a1844d0c1312fb56c1a5f50c104b224',
                       query: app.search_text,
                   }
               }
           ).then(function(risposta2) {
               app.search_array.push(...risposta2.data.results);
               app.research_in_progress=false;
               });
        },

        getCast(){
            var can_enter=true;
            var main_array=[];
            for (var i = 0; i < app.search_array.length; i++) {
                app.search_array[i].actors_name=[];
                axios.get('https://api.themoviedb.org/3/movie/'+ app.search_array[i].id +'/credits',{
                           params:{
                               api_key: '4a1844d0c1312fb56c1a5f50c104b224',
                           }
                       }
                    ).then(function(actors) {
                        app.array=actors.data.cast.slice(0, 5);
                        app.main_array.push(app.array);
                        console.log(app.main_array);
                    });
                // app.array[5]='spazio';
                console.log(app.search_array[i].actors_name.length);
                console.log(i);
            }
            // do {
            //     if (app.main_array.length==app.search_array.length) {
            //         console.log('finito');
            //     }
            // } while (app.main_array.length<app.search_array.length);
        },

    },

    mounted: function(){

    },

})
