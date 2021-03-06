export const appRouter = {
    path: "/",
    name: "root",
    component: () =>
        import ("../views"),
    redirect: "/mars",
    children: [{
            path: "home",
            name: "home",
            component: () =>
                import ("../views/home/")
        },
        {
            path: "api",
            name: "api",
            component: () =>
                import ("../views/api/")
        },
        {
            path: "api/:controller/:model",
            name: "apis",
            component: () =>
                import ("../views/api/")
        },
        {
            path: "color",
            name: "color",
            component: () =>
                import ("../views/color/")
        },
        {
            path: "ibms",
            name: "IBMS",
            component: () =>
                import ("../views/ibms/")
        },
        {
            path: "star",
            name: "star",
            component: () =>
                import ("../views/star/")
        },
        {
            path: "venus",
            name: "venus",
            component: () =>
                import ("../views/venus/")
        },
        {
            path: "mars",
            name: "mars",
            component: () =>
                import ("../views/mars/")
        },
        {
            path: "amr",
            name: "amr",
            component: () =>
                import ("../views/amr/")
        },
        {
            path: "sight",
            name: "sight",
            component: () =>
                import ("../views/sight/")
        },
        {
            path: "wasm",
            name: "wasm",
            component: () =>
                import ("../views/wasm/index")
        },
        {
            path: "switch",
            name: "switch",
            component: () =>
                import ("../views/switch/")
        },
        {
            path: "instance",
            name: "instance",
            description: "设备状态模拟",
            component: () =>
                import ("../views/instance/")
        }
    ]
};

//不需要权限验证的通用路由
export const commonRouters = [{
        path: "/login",
        name: "login",
        component: () =>
            import ("../views/login")
    },
    {
        path: "/403",
        name: "403",
        props: {
            type: "403"
        },
        component: () =>
            import ("../views/error")
    },
    {
        path: "/404",
        name: "404",
        props: {
            type: "404"
        },
        component: () =>
            import ("../views/error/404")
    },
    {
        path: "/500",
        name: "500",
        props: {
            type: "500"
        },
        component: () =>
            import ("../views/error")
    },
    {
        path: "/*",
        name: "error-404",
        redirect: "/404"
    }
];

export const routers = [appRouter, ...commonRouters];