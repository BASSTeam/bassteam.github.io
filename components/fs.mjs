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
    /**
     * Removes single file
     * @param {String} file Path to the file
     * @return {Promise<void>}
     */
    remove(file){
        return new Promise((resolve, reject) => fs.unlink(file, err => {
            if (err) reject(err); else resolve()
        }))
    }
    /**
     * Writes contents to the file
     * @param {String} content Text to write
     * @param {String} file Path to the file
     * @return {Promise<void>}
     */
    write(file, content){
        return new Promise((resolve, reject) => {
            fs.writeFile(file, content, 'utf8', err => {
                if (err) reject(err); else resolve()
            })
        })
    }
    /**
     * Read contents from the file
     * @param {String} file Path to the file
     * @return {Promise<void>}
     */
    read(file){
        return new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) reject(err); else resolve(data)
            })
        })
    }
})();
const {move, rename, copy, list, mkdir, remove, write, read} = _fs
export {move, rename, copy, list, mkdir, remove, write, read};
export default _fs;
