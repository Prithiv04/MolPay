;; Backend/contracts/MolPay.clar - REAL ESCROW & PAYOUT VERSION
(define-constant ERR_INVALID (err u1000))
(define-constant ERR_UNAUTHORIZED (err u3000))
(define-constant ERR_ALREADY_COMPLETED (err u1001))
(define-constant ERR_NOT_COMPLETED (err u1002))

(define-map escrows uint {
  poster: principal,
  worker: principal,
  verifier: principal,
  amount: uint,
  status: (string-ascii 20)
})

(define-public (create-task 
  (task-id uint)
  (worker principal) 
  (verifier principal)
  (amount uint))
  (begin
    ;; 1. Transfer STX from poster to contract (locking escrow)
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    
    ;; 2. Set map
    (map-set escrows task-id {
      poster: tx-sender,
      worker: worker,
      verifier: verifier,
      amount: amount,
      status: "active"
    })
    (ok task-id)))

;; Only the verifier can mark a task as completed
(define-public (complete-task (task-id uint))
  (let ((escrow (unwrap! (map-get? escrows task-id) ERR_INVALID)))
    (asserts! (is-eq tx-sender (get verifier escrow)) ERR_UNAUTHORIZED)
    (asserts! (is-eq (get status escrow) "active") ERR_ALREADY_COMPLETED)
    
    (map-set escrows task-id (merge escrow {status: "completed"}))
    (ok true)))

;; Worker claims their reward after verifier completion
(define-public (claim-reward (task-id uint))
  (let ((escrow (unwrap! (map-get? escrows task-id) ERR_INVALID)))
    (asserts! (is-eq (get status escrow) "completed") ERR_NOT_COMPLETED)
    (asserts! (is-eq tx-sender (get worker escrow)) ERR_UNAUTHORIZED)
    
    ;; Transfer locked STX to the worker
    (try! (as-contract (stx-transfer? (get amount escrow) tx-sender (get worker escrow))))
    
    ;; Mark as paid to prevent double claims
    (map-set escrows task-id (merge escrow {status: "paid"}))
    (ok true)))

(define-read-only (get-escrow (task-id uint))
  (map-get? escrows task-id))
