import React from 'react';

const ProfileModal = ({ showChangePasswordModal, setShowChangePasswordModal, newPassword, setNewPassword, confirmNewPassword, setConfirmNewPassword, handleChangePassword, changePasswordError }) => {
    return (
        <div className="modal fade" id="changePasswordModal" tabIndex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="changePasswordModalLabel">Modifier le mot de passe</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowChangePasswordModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        {changePasswordError && <div className="alert alert-danger">{changePasswordError}</div>}
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">Nouveau mot de passe</label>
                            <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmNewPassword" className="form-label">Confirmer le nouveau mot de passe</label>
                            <input type="password" className="form-control" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowChangePasswordModal(false)}>Fermer</button>
                        <button type="button" className="btn btn-primary" onClick={handleChangePassword}>Modifier le mot de passe</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
