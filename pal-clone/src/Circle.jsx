import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";
const Circle = () => {
    const ref = useRef()
    useEffect(() => {
      const svgElement = d3.select(ref.current)
      svgElement.append("circle")
        .attr("cx", 150)
        .attr("cy", 70)
        .attr("r",  50)
        .attr("fill", "purple")
    }, [])
    return (
      <svg
        ref={ref}
      />
    )
  }
  export default Circle;