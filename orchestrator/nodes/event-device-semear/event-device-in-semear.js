var path = require('path');
var dojot = require('@dojot/flow-node');

class DataHandler extends dojot.DataHandlerBase {
    constructor(publisher) {
        super();
        this.publisher = publisher;
    }

    /**
       * Returns full path to html file
       * @return {string} String with the path to the node representation file
       */
    getNodeRepresentationPath() {
        return path.resolve(__dirname, 'event-device-in-semear.html');
    }

    /**
     * Returns node metadata information
     * This may be used by orchestrator as a liveliness check
     * @return {object} Metadata object
     */
    getMetadata() {
        return {
            'id': 'dojot/event-device-in-semear',
            'name': 'event device in semear',
            'module': 'dojot',
            'version': '1.0.0',
        };
    }

    /**
     * Returns full path to locales
     * @returns String
     */
    getLocalesPath() {
        return path.resolve(__dirname, './locales');
    }

    handleMessage(config, message) {
        try {
            let data = this._get(config.in, message);
            let payload_correto = JSON.parse(data.replace(/'/g, '"').replace(/True/g, 'true').replace(/False/g, 'false'));

            let jsonUplink = payload_correto.attrs.find(item => item.n === 'Contador_uplink'); //Extrai Contador
            let jsonActivation_mode = payload_correto.attrs.find((item) => item.n === "Modo"); //Extrai Modo
            let jsonDatarate = payload_correto.attrs.find((item) => item.n === "Taxa_dados"); //Extrai Taxa
            let jsonRssi = payload_correto.attrs.find((item) => item.n === "Rssi"); //Extrai Rssi
            let jsonSnr = payload_correto.attrs.find((item) => item.n === "Snr"); //Extrai Snr
            let jsonModel = payload_correto.attrs.find((item) => item.n === "model"); //Extrai Model
            let jsonExt_pwr = payload_correto.attrs.find((item) => item.n === "Ext_pwr"); //Extrai Ext_pwr
            let jsonTemperatura = payload_correto.attrs.find((item) => item.n === "Temperatura"); //Extrai Temperatura
            let jsonUmidade = payload_correto.attrs.find((item) => item.n === "Umidade"); //Extrai Umidade
            let jsonEmw_comprimento = payload_correto.attrs.find((item) => item.n === "Emw_comprimento"); //Extrai Emw_comprimento
            let jsonVelocidade_med_Vento = payload_correto.attrs.find((item) => item.n === "Velocidade_med_Vento"); //Extrai Velocidade_med_Vento
            let jsonVelocidade_rg_Vento = payload_correto.attrs.find((item) => item.n === "Velocidade_rg_Vento"); //Extrai Velocidade_rg_Vento
            let jsonEmw_direcao_vento = payload_correto.attrs.find((item) => item.n === "Emw_direção_vento"); //Extrai Emw_direção_vento
            let jsonEmw_temperatura = payload_correto.attrs.find((item) => item.n === "Emw_temperatura"); //Extrai Emw_temperatura
            let jsonEmw_umidade = payload_correto.attrs.find((item) => item.n === "Emw_umidade"); //Extrai Emw_umidade
            let jsonEmw_luminosidade = payload_correto.attrs.find((item) => item.n === "Emw_luminosidade"); //Extrai Emw_luminosidade
            let jsonEmw_uv = payload_correto.attrs.find((item) => item.n === "Emw_uv"); //Extrai Emw_uv
            let jsonEmw_irradiancia = payload_correto.attrs.find((item) => item.n === "Emw_irradiancia"); //Extrai Emw_irradiancia
            let jsongateway = payload_correto.attrs.find((item) => item.n === "gateway");//Extrai gateway

            let output_final = {
            "Contador_uplink": jsonUplink.v,
            "Modo": jsonActivation_mode.vs,
            "Taxa_dados": jsonDatarate.vs,
            "Rssi": jsonRssi.v,
            "Snr": jsonSnr.v,
            "model": jsonModel.vs,
            "Ext_pwr": jsonExt_pwr.vb,
            "Temperatura": jsonTemperatura.v,
            "Umidade": jsonUmidade.v,
            "Emw_comprimento": jsonEmw_comprimento.v,
            "Velocidade_med_Vento": jsonVelocidade_med_Vento.v,
            "Velocidade_rg_Vento": jsonVelocidade_rg_Vento.v,
            "Emw_direcao_vento": jsonEmw_direcao_vento.v,
            "Emw_temperatura": jsonEmw_temperatura.v,
            "Emw_umidade": jsonEmw_umidade.v,
            "Emw_luminosidade": jsonEmw_luminosidade.v,
            "Emw_uv": jsonEmw_uv.v,
            "Emw_irradiancia": jsonEmw_irradiancia.v,
            "gateway": jsongateway.vs
            };

            console.log("Output Final: " + output_final);
           
            this._set(config.out, output_final, message);

            return Promise.resolve([message]);

        } //handle try (first) end 
        catch (error) {
            return Promise.reject(error);
        }
    }//handleMessage(config, message)
}//class DataHandler extends dojot.DataHandlerBase

module.exports = { Handler: DataHandler };
