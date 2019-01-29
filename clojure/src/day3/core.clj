(ns day3.core)

(defn parse-line [l]
  (let [[_ id x y w h] (re-matches #"#(\d+) @ (\d+),(\d+): (\d+)x(\d+)" l)]
    {:id id
     :x (read-string x)
     :y (read-string y)
     :w (read-string w)
     :h (read-string h)}))

(def data (->> "src/day3/input"
               slurp
               clojure.string/split-lines
               (map parse-line)))

(defn all-coords-for-instruction [{x :x
                   y :y
                   w :w
                   h :h}]
  (for [xs (range x (+ x w))
        ys (range y (+ y h))]
    {:x xs :y ys}))

(defn coords-occupancy [instructions]
  (->> instructions
       (mapcat all-coords-for-instruction)
       frequencies))

(coords-occupancy (take 5 data))

(defn part1a [input]
  (let [coords (coords-occupancy input)]
    (count (filter #(> (val %) 1) coords))))

(defn unique? [occupancy-map instructions]
  (every? #(= (occupancy-map %) 1) instructions))

(defn part2 [input]
  (let [a (coords-occupancy input)
        coords-for-each (map all-coords-for-instruction input)]
    (first (filter #(unique? a %) coords-for-each))))

(part1a data)
(part2 (take 5 data))

(coords-occupancy (take 5 data))
(map all-coords-for-instruction (take 10 data))