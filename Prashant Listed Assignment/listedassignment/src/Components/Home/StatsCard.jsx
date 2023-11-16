const StatsCard = ({maxPopulation}) =>{
  const maxPopulations = maxPopulation.toLocaleString()
    return(
        <div className="card-container">
          <div className="card">
            <p>Total Revenues</p>
            <p>${maxPopulations ? (maxPopulations) : maxPopulations === null ? ( "Please Wait Loading...") : ("Something... Went Wrong!")}</p>
            <i className="fad fa-money-bill"></i>
          </div>

          <div className="card">
            <p>Total Transactions</p>
            <p>1,520</p>
            <i className="far fa-tags"></i>
          </div>

          <div className="card">
            <p>Total Revenues</p>
            <p>9,721</p>
            <i className="fas fa-thumbs-up"></i>
          </div>

          <div className="card">
            <p>Total Users</p>
            <p>892</p>
            <i className="far fa-user-friends"></i>
          </div>
        </div>
    )
}

export default StatsCard;