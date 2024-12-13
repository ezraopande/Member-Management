const APICard = ({ name, description, icon, onClick }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border hover:shadow-xl transition">
        <div className="bg-green-100 rounded-full p-4 mb-4 flex items-center justify-center">
          <i className={`${icon} text-3xl text-green-500`}></i>
        </div>
        <h3 className="text-lg font-bold text-green-600 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <button
          onClick={onClick}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
        >
          Learn more
        </button>
      </div>
    );
  };
  
  export default APICard;
  