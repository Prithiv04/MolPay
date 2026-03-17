;; molpay-analytics.clar
;; Tracks bot performance metrics: tasks completed, total earned, success rate.

(define-constant ERR_UNAUTHORIZED (err u3000))

(define-map bot-stats principal {
  tasksCompleted: uint,
  totalEarned: uint,
  successRate: uint  ;; Percentage
})

(define-data-var analytics-owner principal tx-sender)

;; Called from the core molpay contract to update stats
(define-public (record-bot-success (bot principal) (amount uint))
  (let 
    ((stats (default-to {tasksCompleted: u0, totalEarned: u0, successRate: u100} 
                        (map-get? bot-stats bot))))
    
    ;; Simple logic for demo: Increment tasks, add amount, fixed success rate for now
    (map-set bot-stats bot {
      tasksCompleted: (+ (get tasksCompleted stats) u1),
      totalEarned: (+ (get totalEarned stats) amount),
      successRate: u99 ;; Placeholder logic
    })
    (ok true)))

;; Read-only: Get bot statistics
(define-read-only (get-bot-stats (bot principal))
  (ok (map-get? bot-stats bot)))
