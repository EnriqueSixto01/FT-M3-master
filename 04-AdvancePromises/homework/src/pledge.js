'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
class $Promise{
    constructor(executor){
        if(typeof executor !== 'function'){
            throw new TypeError('Executor is not a function')
        }
        this._state = 'pending';
        this._value = undefined;
        this._handlerGroups = []
        


        executor(this._internalResolve.bind(this), this._internalReject.bind(this));
         // executor(()=> _internalResolve())
    }

    _internalResolve(someData){
        if(this._state === 'pending'){
            this._state = 'fulfilled'
            this._value = someData
            this._callHandlers()
        }
    }

    _internalReject(myReason){
        if(this._state === 'pending'){
            this._state = 'rejected'
            this._value = myReason
            this._callHandlers()
            
        }
    }

    then(successCb, errorCb){
        if(typeof successCb !== "function") successCb= false;
        if(typeof errorCb !== "function") errorCb= false;
        const downstreamPromise= new $Promise(function(){})
        this._handlerGroups.push({successCb, errorCb, downstreamPromise})
        if(this._state !== "pending") this._callHandlers()
            return downstreamPromise;
    }

    _callHandlers(){
        while(this._handlerGroups.length > 0){
            let current = this._handlerGroups.shift()
            const downstreamPromise = current.downstreamPromise;//es tu promesa

            if(this._state === "fulfilled"){
                if(!current.successCb){   //si no existe succesCb "manejador de fulfilled"
                    downstreamPromise._internalResolve(this._value)  //a la promesa se le ejecuta su resolve con el valor de this._value
                }else{                    //si existe successCb "manejador de fulfilled"
                    try{
                        let result = current.successCb(this._value) //como existe, lo ejecuto con su valor y lo guardo en result
                        if(result instanceof $Promise){//si result esta en el prototipo de $promise
                            // downstreamPromise._internalResolve(result)
                            result.then((value)=>{  //evalua result.then con un resolve y un reject como parametros
                                downstreamPromise._internalResolve(value)}, 
                                (reson)=>{
                                    downstreamPromise._internalReject(reson)
                                })
                        }else{   //si result no esta en el prototipo de $promise
                            downstreamPromise._internalResolve(result)
                        }
                    }catch(error){
                        downstreamPromise._internalReject(error)
                    }
                }
            }else{   // si state no es fulfilled
                if(!current.errorCb){
                    downstreamPromise._internalReject(this._value)
                }else{
                    try{
                        let result = current.errorCb(this._value) //como existe, lo ejecuto con su valor y lo guardo en result
                        if(result instanceof $Promise){//si result esta en el prototipo de $promise
                            // downstreamPromise._internalResolve(result)
                            result.then((value)=>{  //evalua result.then con un resolve y un reject como parametros
                                downstreamPromise._internalResolve(value)}, 
                                (reason)=>{
                                    downstreamPromise._internalReject(reason)
                                })
                        }else{   //si result no esta en el prototipo de $promise
                            downstreamPromise._internalResolve(result)
                        }
                    }catch(error){
                        downstreamPromise._internalReject(error)
                    }
                }
            }
        }
    }

    catch(errorCb){
        return this.then(null, errorCb )
    }

};
module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
