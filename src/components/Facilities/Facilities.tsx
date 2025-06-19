type FacilitiesProps = {
    image: string,
    number: string,
    text : string
}


const Facilities = ({image, number,text}: FacilitiesProps) => {
    return (
        <>
             <div className="rounded-full w-45 h-45 text-center text-wrap  mx-auto m-4 bg-sky-100">
                <div className="space-y-2">
              <img
                src={image}
                alt=""
                className="w-12 mx-auto mt-2"
              />
              <p className="text-cyan-700 text-4xl font-roboto ">{number}</p>
              <p className="text-sky-400 text-xl font-bold font-roboto text-wrap">
               {text}
              </p>
            </div>
          </div>
        </>
    )
}

export default Facilities