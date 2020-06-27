module.exports = function ({ types: t }) {
    return {
        visitor: {
            ImportDeclaration(path) {
                const current = path.node
                if (current.source.value == 'remax/one') {
                    const arr = current.specifiers.map((e) => {
                        if (e.type !== 'ImportSpecifier') return null
                        const importName = e.imported.name
                        const n = t.importDeclaration(
                            [
                                t.importDefaultSpecifier(
                                    t.identifier(importName),
                                )
                            ],
                            t.stringLiteral('@remax/one/esm/hostComponents/' + importName + '/index.web'),
                        )
                        return n
                    })
                    path.parent.body.splice(1, 0, ...arr)
                    path.remove()
                }
            }
        }
    }
}