const colors = ['#5C9DDD', '#B5DAFF', '#9DEAD7', '#58B586', '#9EC4EB'];

export function getColorByDepth(depth) {
    if(depth >= colors.length) {
        depth -= colors.length 
    }
    return colors[depth]
}