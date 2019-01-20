(ns day1.core)

(def data (->> "src/day1/input"
               slurp
               clojure.string/split-lines
               (map read-string)))

(defn part1 []
  (reduce + data))

(defn part2 []
  (let [xs (reductions + (cycle data))]
    (loop [seen #{} xs xs]
      (let [curr (first xs)]
        (if (contains? seen curr)
          curr
          (recur (conj seen curr) (rest xs)))))))

;(part1)
;(part2)