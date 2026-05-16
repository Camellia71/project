//你所拥有的权限 当前按钮所需要的权限  
function withPermissions<P extends Record<string, unknown>>(requiredPermissions: string[], userPermissions: string[]): (Component: React.ComponentType<P>) => React.ComponentType<P> {

    return function (Component: React.ComponentType<P>) {
        return function (props: P): React.ReactElement | null {
            const hasPermission: boolean = requiredPermissions.every(item => userPermissions.includes(item));
            if (!hasPermission) {
                return null
            }
            return <Component {...props} />
        }
    }
}

export default withPermissions