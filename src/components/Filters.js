import React, {useMemo} from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {filters: {text,category,company,color,shipping,min_price,max_price,price},updateFilters,clearFilters,all_products:products} = useFilterContext();

  let categories = useMemo(()=>{
    return getUniqueValues(products,"category")
  },[products]);

  let companies = useMemo(()=>{
    return getUniqueValues(products,"company")
  },[products])

  let colors = useMemo(()=>{
    return getUniqueValues(products,"colors")
  },[products])



  return <Wrapper>
    <div className="content">
      <form onSubmit={(e)=>e.preventDefault()}>
        {/* SEARCH INPUT START */}
        <div className="form-control">
          <input type="text" name="text" className="search-input" placeholder="search" value={text} onChange={updateFilters} />
        </div>
        {/* SEARCH INPUT END */}

        {/* CATEGORY START */}
        <div className="form-control">
          <h5>Category</h5>
          <div>
            <button className={`${category==='all'?'active':''}`} type='button' onClick={updateFilters} name="category">all</button>
            {
              categories.map((currentCategory,index)=>{
                return <button key={index} className={`${category===currentCategory?'active':''}`} type='button' onClick={updateFilters} name="category">{currentCategory}</button>
              })
            }
          </div>
        </div>
        {/* CATEGORY END */}

        {/* FORM START */}
        <div className="form-control">
          <h5>Company</h5>
          <select value={company} onChange={updateFilters} name="company" className="company">
            <option value="all">all</option>
            {
              companies.map((currentCompany,index)=>{
                return <option key={index} value={currentCompany}>{currentCompany}</option>
              })
            }
          </select>
        </div>
        {/* FORM END */}

        <div className="form-control">
          <h5>colors</h5>
          <div className="colors">
            <button data-color="all" onClick={updateFilters} className={`all-btn ${color==="all"?'active':''}`} name="color">All</button>
            {
              colors.map(currentColor=>{
                return <button key={currentColor} data-color={currentColor} onClick={updateFilters} className={`color-btn ${color===currentColor?'active':''}`} style={{backgroundColor: currentColor}} name="color">
                  {currentColor === color && <FaCheck/>}
                </button>
              })
            }
          </div>
        </div>

        <div className="form-control">
          <h5>Price</h5>
          <p className="price">{formatPrice(price)}</p>
          <input onChange={updateFilters} type="range" name="price" min={min_price} max={max_price} value={price} />
        </div>

        <div className="form-control shipping">
          <label htmlFor="shipping">free shipping</label>
          <input checked={shipping} onChange={updateFilters} type="checkbox" name="shipping" id="shipping" />
        </div>

        <button onClick={clearFilters} type="button" className="clear-btn">clear filters</button>
      </form>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
