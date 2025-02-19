export const links = [
    {
        label:'Create post',
        route:'/create-post',
        imgURL:'./assets/svg/create.svg'
    },
    {
        label:'Edit post',
        route:'/edit-post/:id',
        imgURL:'./assets/svg/edit.svg'
    },
    {
        label:'Saved post',
        route:'/saved',
        imgURL:'./assets/svg/saved.svg'
    },
    {
        label:'Liked post',
        route:'/liked',
        imgURL:'./assets/svg/heart.svg'
    },
    {
        label:'People',
        route:'/all-users',
        imgURL:'./assets/svg/users.svg' 
    }

]

export const bottomLinks = [
    {
        icon:'./assets/svg/home.svg',
        route:'/'
    },
    {
        icon:'./assets/svg/users.svg',
        route:'/all-users' 
    },

    {
        icon:'./assets/svg/saved.svg',
        route:'/saved'
    },
    {
        icon:'./assets/svg/explore.svg',
        route:'/create-post'
    }
]