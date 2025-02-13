export const links = [
    {
        label:'Create post',
        route:'/create-post'
    },
    {
        label:'Edit post',
        route:'/edit-post/:id'
    },
    {
        label:'Saved post',
        route:'/saved'
    },
    {
        label:'Liked post',
        route:'/liked'
    },
    {
        label:'People',
        route:'/all-users'  
    }

]

export const bottomLinks = [
    {
        icon:'./public/assets/icons/home.png',
        route:'/'
    },
    {
        icon:'./public/assets/icons/group.png',
        route:'/all-users' 
    },

    {
        icon:'./public/assets/icons/bookmark-white.png',
        route:'/saved'
    },
    {
        icon:'./public/assets/icons/edit.png',
        route:'/create-post'
    }
]