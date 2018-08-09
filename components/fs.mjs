import fs from 'fs';
import mkdirp from 'mkdir-recursive';

const _fs = new (class FileSystem {
    constructor(){
        this.rename = this.move;
    }
    /**
     * Moves (renames) single file
     * @param {String} from Path to file
     * @param {String} to New destination
     * @return {Promise<void>}
     */
    move(from, to){
        return new Promise((resolve, reject) => {
            fs.rename(from, to, err => {
                if (err) reject(err); else resolve()
            })
        })
    }
    /**
     * Copies single file
     * @param {String} from Path to file
     * @param {String} to New destination
     * @return {Promise<void>}
     */
    copy(from, to){
        return new Promise((resolve, reject) => {
            var rd = fs.createReadStream(from),
                wr = fs.createWriteStream(to);
            rd.on("error", err => reject(err));
            wr.on("error", err => reject(err));
            wr.on("close", () => resolve());
            rd.pipe(wr);
        })
    }
    /**
     * Lists dir
     * @param {String} dir Path to the directory
     * @return {Promise<Array<String>>}
     */
    list(dir){
        return new Promise((resolve, reject) => {
            fs.readdir(dir, (err, files) => {
                if (err) reject(err); else resolve(files)
            })
        })
    }
    /**
     * Creates dir (recursively if needed)
     * @param {String} dir Path to the directory
     * @return {Promise<void>}
     */
    mkdir(dir){
        return new Promise((resolve, reject) => {
            mkdirp.mkdir(dir, 0o755, err => {
                if (err) reject(err); else resolve()
            })
        })
    }
})();
const {move, rename, copy, list, mkdir} = _fs
export {move, rename, copy, list, mkdir};
export default _fs;
