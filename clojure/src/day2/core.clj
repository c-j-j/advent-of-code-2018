(ns day2.core)

(def data (->> "src/day2/input"
               slurp
               clojure.string/split-lines))

(defn two-or-three [w]
  (let [freqs (frequencies w)]
    [(min 1 (count (filter #(= (second %) 2) freqs)))
     (min 1 (count (filter #(= (second %) 3) freqs)))]))

(two-or-three "helloo")

(defn part1 []
  (->> data
       (map two-or-three)
       (apply map +)
       (reduce *)))

(defn off-by-one [a b]
  (= 1 (count (filter (fn [[a b]] (not= a b)) (map vector a b)))))

(defn part2 []
  (let [[match1 match2]
        (for [x data
              y data
              :when (off-by-one x y)]
          y)]
    (apply str (map first (filter (fn [[a b]] (= a b))
                                  (map vector match1 match2))))))


(for [x data y data] (vector x y))
(part1)
(part2)