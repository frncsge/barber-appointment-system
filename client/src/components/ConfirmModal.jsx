function ConfirmModal({
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}) {
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center"
      onClick={onCancel}
    >
      <div
        className="bg-white p-4 w-[90%] max-w-[300px] flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="font-bold text-center">{title || "Confirm"}</h1>
        <p>{description || "Continue with the action?"}</p>
        <section className="flex gap-4 justify-end mt-3">
          <button
            className="text-sm p-2 bg-gray-100 text-gray-500"
            onClick={onCancel}
          >
            {cancelLabel || "Cancel"}
          </button>
          <button
            className={`bg-black text-white p-2 text-sm`}
            onClick={onConfirm}
          >
            {confirmLabel || "Continue"}
          </button>
        </section>
      </div>
    </div>
  );
}

export default ConfirmModal;
