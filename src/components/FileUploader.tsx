import initSqlJs, { Database } from "sql.js";

interface SingleFileUploaderProps {
  setIsLoading: (isLoading: boolean) => void;
  setDatabase: (db: Database | null) => void;
}

const SingleFileUploader = (props: SingleFileUploaderProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      props.setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
        initSqlJs({ locateFile: file => `https://sql.js.org/dist/${file}` }).then((SQL) => {
          const db = readerEvent?.target?.result && readerEvent?.target?.result instanceof ArrayBuffer ? new SQL.Database(new Uint8Array(readerEvent.target.result)) : null;
          props.setDatabase(db);
          props.setIsLoading(false);
        })
      }
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div className="input-group">
      <input id="file" type="file" onChange={handleFileChange}
        className="text-sm text-grey-500
            file:mr-5 file:py-3 file:px-10
            file:rounded-full file:border-0
            file:text-md file:font-semibold  file:text-white
            file:bg-gradient-to-r file:from-blue-600 file:to-amber-600
            hover:file:cursor-pointer hover:file:opacity-80
          " />
    </div>
  );
};


export default SingleFileUploader;