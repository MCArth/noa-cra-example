
import { Texture } from '@babylonjs/core/Materials/Textures'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { Vector3, Matrix } from '@babylonjs/core/Maths/math'
import "@babylonjs/core/Meshes/meshBuilder"




/*
 * 
 *		Register a bunch of blocks and materials and whatnot
 * 
*/

export function initRegistration(noa) {

    // block materials
    var brownish = [0.45, 0.36, 0.22]
    var greenish = [0.1, 0.8, 0.2]
    var greenish2 = [0.1, 0.6, 0.2]
    noa.registry.registerMaterial('grass', greenish, null)
    noa.registry.registerMaterial('grass2', greenish2, null)
    noa.registry.registerMaterial('dirt', brownish, null, false)
    var strs = ['a', 'b', 'c', 'd', '1', '2']
    for (var i = 0; i < 6; i++) {
        var s = strs[i]
        noa.registry.registerMaterial(s, null, s + '.png')
        noa.registry.registerMaterial('t' + s, null, 't' + s + '.png', true)
    }
    noa.registry.registerMaterial('water', [0.5, 0.5, 0.8, 0.7], null)


    // do some Babylon.js stuff with the scene, materials, etc.
    var scene = noa.rendering.getScene()


    // register a shinyDirt block with a custom render material
    var shinyMat = noa.rendering.makeStandardMaterial('shinyDirtMat')
    shinyMat.specularColor.copyFromFloats(1, 1, 1)
    shinyMat.specularPower = 32
    shinyMat.bumpTexture = new Texture('textures/stone.png', scene)
    noa.registry.registerMaterial('shinyDirt', brownish, null, false, shinyMat)


    // object block mesh
    var mesh = Mesh.CreateBox('b', 1, scene)
    var mat = Matrix.Scaling(0.2, 1, 0.2)
    mat.setTranslation(new Vector3(0, 0.5, 0))
    mesh.bakeTransformIntoVertices(mat)
    scene.removeMesh(mesh)


    // block types registration
    var blockIDs = {}
    var _id = 1

    blockIDs.dirtID = noa.registry.registerBlock(_id++, { material: 'dirt' })
    blockIDs.shinyDirtID = noa.registry.registerBlock(_id++, { material: 'shinyDirt' })
    blockIDs.grassID = noa.registry.registerBlock(_id++, { material: 'grass' })
    blockIDs.grass2ID = noa.registry.registerBlock(_id++, { material: 'grass2' })
    blockIDs.testID1 = noa.registry.registerBlock(_id++, { material: ['b', 'd', '1', '2', 'c', 'a'] })
    blockIDs.testID2 = noa.registry.registerBlock(_id++, {
        material: ['tb', 'td', 't1', 't2', 'tc', 'ta'],
        opaque: false,
    })
    blockIDs.testID3 = noa.registry.registerBlock(_id++, { material: ['1', '2', 'a'] })
    blockIDs.waterID = noa.registry.registerBlock(_id++, {
        material: 'water',
        fluid: true
    })
    blockIDs.customID = noa.registry.registerBlock(_id++, {
        blockMesh: mesh,
        opaque: false,
        onCustomMeshCreate: function (mesh, x, y, z) {
            mesh.rotation.y = ((x + 0.234) * 1.234 + (z + 0.567) * 6.78) % (2 * Math.PI)
        },
    })


    return blockIDs
}


