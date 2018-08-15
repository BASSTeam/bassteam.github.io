import {attrs, childs, content, Element} from 'components/page';
import {gunzip} from 'zlib';
function unpack(b64data){
    return new Promise((resolve, reject) => {
        gunzip(Buffer.from(b64data, 'base64'), (err, buf) => {
            if(err) reject(err); else resolve(buf.toString())
        })
    })
}
export default async () => {
    return new Element('div', {
        [content]: await unpack('H4sIADzvc1sAA8VWTW/jIBC9769AVCt1DyHYjp24iSu1XW1Pu4duL3skGDuoBCyM8/Hvd4xbK2mrbRptGyQkGIaZN+8ZzCyXq8tZvSrRZql0neGFc9XFcLher8k6IsaWw5BSOgQP3LlcbJTUD685BmmaDv0qRisp1tdmk2GKKAqo7xhVVtTCrsRVXQnu7piTJsObnzL/Ax2j2m2VyPCc8YfSmkbnF0gbLab4cpaLor6cFVI5YZHMM1waI7YAKcMDCP0Vo20/WsvcLTIc+clCyHLhnmbcKGMHUkOUyqg2vx50QaH0+u72GlIV4pY1dS2ZvlYNJNMZ/m0ay8WtZdVC8hZn/l2spN+e4ZCM6F4bQZDhfpQ26o1ZVlCNdveW6bqAOoCNRgE23jhTFD71j0bzK+S2FfAATApmIZ0y7TQAAj1yLirYNIi7NH6HH71I0Fp9cTDoCCxRZ8hwY9X5mSfxG27tzu8xdplhPwRyxHlMUUxfrFvj2sUonpC4XeTSciUQBy2CMXAMSgBUyBGRZITbjCrDZ0EeFeMQ3JmWS9iPmHNWzhsnfrEllAeFPojtvVwKkIJOKYmnAXxHTDWtISJxuteS6YRE+6bpSyeM8gaAjGrAIyrB3A18VkCe1MCH1NIJjOaibDUegBPw9IgORl1ZPd77JwKeA++ZwY+6dfzsl7NTCp1GCX0HMLqLq0cBprLrx2gXjIJ/KjcmcdgrFydpmp9IufAQ5SISnkC7g6BRMvkA+ZLxGycv3j15+UTMi/Q0+gUketYOYQ2u1BMIehzWgCQfcUCjyRsHNOn1HQc85PxE+h5B0WfJecSX9p/Ui+LwzV/jpNdvBHSyE92v/n569zX2SQoeCO7Z9f+Khr7DE7Z9B8F798tfEVDpgPYKAAA='),
        [attrs]: {
            id: 'loading-anim'
        }
    })
}
